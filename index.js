const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');// manipular e setar diretório das views
const { Pool } = require('pg');
const PgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt')
const port = 3000;
const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'login_system',
    password: 'postgres',
    port: 5432,
})

app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: 'haushaush',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 dias
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));


app.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.render('index', { error: 'Insira o email e a senha.' });
    } else {
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            if (result.rows.length > 0) {

                const user = result.rows[0];

                // Verifica a senha
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    req.session.email = email;
                    res.render('logado', { email: email, name: user.name });
                } else {
                    res.render('index', { error: 'Senha incorreta.' });
                }
            } else {
                res.render('index', { error: 'Email não cadastrado' });
            }
        } catch (error) {
            console.error('Erro ao consultar o banco de dados', error);
            res.render('index', { error: 'Erro ao consultar o banco de dados' });
        }
    }
});

app.get('/', (req, res) => {
    if (req.session.email) {
        //res.render('logado', { email: req.session.email });
        res.render('logado', { email: req.session.email, name: req.session.name });
    } else {
        res.render('index', { error: '' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão', err);
        }
        res.redirect('/');
    });
});

// Cadastro

app.get('/cadastrar', (req, res) => {
    res.render('cadastrar', { error: '' });
});

app.post('/cadastrar', async (req, res) => {
    const { username, name, email, birthdate, password, 'confirm-password': confirmPassword } = req.body;

    if (password != confirmPassword) {
        return res.render('cadastrar', {
            error: 'As senhas não coincidem.',
            username,
            name,
            email,
            birthdate,
            password: '',
            confirmPassword: ''
        });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    try {

        const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);

        if(emailCheck.rowCount > 0){
            console.log('EMAIL JÁ EXISTE')
            return res.render('cadastrar', {error: 'O email já está cadastrado'}); //talvez voltar para a tela login?
        }

        /*const userNameCheck =  await pool.query('SELECT id FROM users WHERE username = $1', [username])

        if(userNameCheck.rowCount > 0){
            return res.render('cadastrar', {error: 'Username já existe.'}); 
        }*/

        await pool.query(
            'INSERT INTO users(username, name, email, birthdate, password) VALUES($1, $2, $3, $4, $5)',
            [username, name, email, birthdate, hashedPassword]

        );
        res.render('logado', { email, name })
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
        res.render('cadastrar', { error: 'Erro ao cadastrar usuário' });
    }
});

app.get('/check-username', async (req, res) => {
    const { username } = req.query;

    try {
        const userNameCheck = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    
        if (userNameCheck.rowCount > 0){
            res.json({ exists: true});
        } else {
            res.json({ exists: false});
        }
    } catch (error) {
        console.error('Erro ao consultar o banco de dados', error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados'});
    }
});

app.listen(port, () => {
    console.log('Servidor rodando');
});
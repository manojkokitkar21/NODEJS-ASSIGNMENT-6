const app = require('./app');

dotenv.config();
mongoose.connect(
process.env.DATABASE_URL,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => {
console.log('Connected to DB');
}
);

// Start the server
app.listen(3000, () => console.log('Server running...'));
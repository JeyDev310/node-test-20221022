import app from './app'
import { initData } from './services/initialize.service';
import sequelize from './constants/db.init';

//db connection
sequelize.sync();

const port = 8000;

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on Port ${port}`);
    initData();
});

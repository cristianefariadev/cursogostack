import Sequelize, { Model } from 'sequelize'; // importar o model do sequelize

class User extends Model {
  // classe user que extende o model
  static init(sequelize) {
    // metodo chamado pelo sequelize
    super.init(
      {
        // parametros
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;

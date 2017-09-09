module.exports = function(sequelize, DataTypes){
var UserFound = sequelize.define("user_found", {
  nameFound: {
    type: DataTypes.STRING,
    allowNull: false,
      validate: {
        len: [1]
      }
  },
  emailFound: {
    type: DataTypes.STRING,
    allowNull: false,
      validate: {
        len: [1]
      }
  },
  phoneFound: {
    type: DataTypes.STRING,
    allowNull: false,
      validate: {
        len: [1]
      }
  },
  addressFound: {
    type: DataTypes.STRING,
    allowNull: false,
      validate: {
        len: [1]
      }
  },
  typeFound: {
    type: DataTypes.STRING,
    allowNull: false,
      validate: {
        len: [1]
      }
  },
  dateFound: {
    type: DataTypes.STRING,
    allowNull: false,
      validate: {
        len: [1]
      }
  },
  genderFound: {
    type: DataTypes.STRING,
    allowNull: false,
      validate: {
        len: [1]
      }
  },
  commentFound: {
    type: DataTypes.STRING,
  }
  // photoFound: {
  //   type: DataTypes.STRING,
  //   isURL: true,
  // }
  // photoFound: {
  //   type: DataTypes.BLOB
  // }
});

return UserFound;
};

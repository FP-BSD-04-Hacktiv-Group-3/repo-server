const axios = require("axios");
const redis = require("../config/redis");

const typeDefs = `#graphql

type Profile {
    _id: ID
    username: String
    address:String
    phoneNumber:String
    userId: String
  }

 type User {
    _id: ID
    email: String
    password: String
    role: String
    Profile: Profile
    Store: Store
  }

  type Store {
  name:String
  UserId:String
  location:String
  profileImg:String
  }

  input UserInput {
    email: String
    password: String
    role: String
  }
type Login {
    id:ID
    email:String
    access_token:String
    role:String
}

  input LoginInput {
    email: String
    password: String
  }

type Edit{
    email:String
    role:String
}
    input EditInput {
    email:String
    password:String
    role:String
    }

type Query{
    getUsers: [User]
    getUser(id: ID): User
}
type Mutation{
    editUser(_id:ID,editUser:EditInput):Edit
    login(login:LoginInput):Login
    addUser(newUser: UserInput): User
    deleteUser(_id: ID): String
}
`;

const USER_URL = process.env.USER_URL || "http://localhost:4001";
const APP_URL = process.env.APP_URL || "http://localhost:4002";

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const { data } = await axios.get(`${USER_URL}/users`);
        // console.log(data);
        return data.users;
      } catch (error) {
        console.log("Error", error);
      }
    },
    getUser: async (_, args) => {
      try {
        const { data } = await axios.get(`${USER_URL}/users/detail/${args.id}`);
        console.log(data, "<<< data");
        const { data: storeData } = await axios.get(
          `${APP_URL}/store/user/${args.id}`
        );

        const result = {
          ...data.user,
          Store: storeData || null,
        };
        return result;
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
  Mutation: {
    login: async (_, args) => {
      try {
        const { email, password } = args.login;
        const { data } = await axios.post(`${USER_URL}/users/login`, {
          email,
          password,
        });
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    addUser: async (_, args) => {
      try {
        const { email, password, role } = args.newUser;
        const { data } = await axios.post(`${USER_URL}/users`, {
          email,
          password,
          role,
        });
        // console.log(data);
        return data.user;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: `${USER_URL}/users/${_id}`,
        });
        await redis.del("data");
        // console.log(data);
        return data.message;
      } catch (error) {
        console.log(error, "<< eror");
      }
    },
    editUser: async (_, args) => {
      try {
        const { _id } = args;
        const { email, password, role } = args.editUser;
        const { data } = await axios.patch(`${USER_URL}/users/${_id}`, {
          email,
          password,
          role,
        });

        if (data?.user?.modifiedCount === 1) {
          const { data } = await axios.get(`${USER_URL}/users/${_id}`);
          return data.user;
        }
      } catch (error) {
        console.log(error, "<<< eror");
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};

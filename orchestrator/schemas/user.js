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
    role: String
    Profile: Profile
    Store: Store
  }

  type Store {
  id:ID
  name:String
  UserId:String
  location:String
  profileImg:String
  createdAt:String
  updatedAt:String
  totalProduct:Int
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
}
    input EditInput {
    email:String
    password:String
    address:String
    phoneNumber:String
    image: String
    username:String
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
        // console.log(data, "<<< data");

        const { data: storeData } = await axios.get(
          `${APP_URL}/store/user/${args.id}`
        );

        // console.log(result, "<<< res");

        const { data: productData } = await axios.get(
          `${APP_URL}/product/store/${storeData.id}`
        );
        // console.log(productData.length, "<<product data");

        // trap condition

        const result = {
          ...data.user,
          Store: {
            ...storeData,
            totalProduct: productData.length,
          },
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

        const idUser = data.user._id;

        const { data: addStore } = await axios.post(`${APP_URL}/store`, {
          name: "",
          UserId: idUser,
          location: "",
        });

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
        const { username, address, phoneNumber, email, password, image } =
          args.editUser;

        console.log(args.editUser);
        const { data } = await axios.patch(`${USER_URL}/users/${_id}`, {
          email: email,
          password: password,
          username: username,
          address: address,
          phoneNumber: phoneNumber,
        });

        const { data: storeImage } = await axios.put(
          `${APP_URL}/store/image/${_id}`,
          {
            image: image,
          }
        );
        console.log(storeImage, "<< soterimage");

        if (data?.user?.modifiedCount === 1) {
          const { data } = await axios.get(`${USER_URL}/users/${_id}`);

          return data.user.email;
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

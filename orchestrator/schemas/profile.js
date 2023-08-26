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

  input ProfileInput {
    username: String
    address:String
    phoneNumber:String
    userId: String
  }

type EditProfile{
    username: String
    address:String
    phoneNumber:String
    userId: String
}
    input EditInputProfile {
    username: String
    address:String
    phoneNumber:String
    userId: String
    }

type Query{
    getProfiles: [Profile]
    getProfile(id: ID): Profile
}
type Mutation{
    editProfile(_id:ID,editProfile:EditInputProfile):EditProfile
    addProfile(newProfile: ProfileInput): Profile
    deleteProfile(_id: ID): String
}
`;

const PROFILE_URL = process.env.PROFILE_URL || "http://localhost:4001";

const resolvers = {
  Query: {
    getProfiles: async () => {
      try {
        const { data } = await axios.get(`${PROFILE_URL}/profiles`);
        // console.log(data);
        return data.profiles;
      } catch (error) {
        console.log("Error", error);
      }
    },
    getProfile: async (_, args) => {
      try {
        const { data } = await axios.get(`${PROFILE_URL}/profiles/${args.id}`);
        // console.log(data);
        return data.profile;
      } catch (error) {
        console.log("Error", error);
      }
    },
  },
  Mutation: {
    addProfile: async (_, args) => {
      try {
        const { username, address, phoneNumber, userId } = args.newProfile;
        const { data } = await axios.post(`${PROFILE_URL}/profiles`, {
          username,
          address,
          phoneNumber,
          userId,
        });
        console.log(data);
        return data.profile;
      } catch (error) {
        console.log(error);
      }
    },
    deleteProfile: async (_, args) => {
      try {
        const { _id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: `${PROFILE_URL}/profiles/${_id}`,
        });
        await redis.del("data");
        // console.log(data);
        return data.message;
      } catch (error) {
        console.log(error, "<< eror");
      }
    },
    editProfile: async (_, args) => {
      try {
        const { _id } = args;
        const { username, address, phoneNumber, userId } = args.editProfile;
        const { data } = await axios.patch(`${PROFILE_URL}/profiles/${_id}`, {
          username,
          address,
          phoneNumber,
          userId,
        });

        if (data?.profile?.modifiedCount === 1) {
          const { data } = await axios.get(`${PROFILE_URL}/profiles/${_id}`);
          return data.profile;
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

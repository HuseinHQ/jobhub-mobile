const axios = require("axios");

const job_url = "http://localhost:4002/jobs/";
const user_url = "http://localhost:4001/users/";

const appTypeDefs = `#graphql
  type Job {
    id: ID
    title: String,
    description: String,
    companyId: Int,
    authorId: String,
    jobType: String,
    Skills: [Skill],
    Company: Company,
    User: User
  }

  type Skill {
    id: ID,
    name: String,
    level: String
  }

  type Company {
    id: ID
    name: String,
    companyLogo: String,
    location: String,
    email: String,
    description: String
  }

  type User {
    _id: ID
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String
    address: String
  }

  type Query {
    jobs: [Job],
    job(id: ID!): Job
  }
`;

const appResolvers = {
  Query: {
    jobs: async () => {
      try {
        const { data } = await axios.get(job_url);

        return data;
      } catch (err) {
        console.log(err);
      }
    },
    job: async (_, { id }) => {
      try {
        const { data: job } = await axios.get(job_url + id);
        const { data: user } = await axios.get(user_url + job.authorId);

        job.User = user;
        return job;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { appTypeDefs, appResolvers };

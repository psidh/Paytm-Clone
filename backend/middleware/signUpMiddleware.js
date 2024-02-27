const z = require('zod');

const signUpBody = z.objectUtil({
  username: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
});

export default signUpBody;

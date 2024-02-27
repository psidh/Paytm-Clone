const signInBody = zod.object({
  username: zod.string().email(),
password: zod.string()
})

export default signInBody;
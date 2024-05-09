import jwt from "jsonwebtoken";
const secretKey = "dffgfghhhhhhhhhhhffffffffff";
const verifyToken = async(req:any, res:any,next:any)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = await jwt.verify(token, secretKey);
        if (!decoded) {
          throw new Error();
        }
        req.user = decoded;
    
        next();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Validating Token" });
      }
}


export default verifyToken;
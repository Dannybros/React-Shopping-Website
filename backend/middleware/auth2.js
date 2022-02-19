import jwt from 'jsonwebtoken';

const auth2 = async (req, res, next)=>{
    
    // const token = req.header('auth-token');
     const token = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];

    // if(!token) return res.status(401).send("Access Denied");
    try {
        let verified;
        const custom = token?.length < 500
  
        if(token && custom){
            verified = jwt.verify(token, process.env.JWT_SCRECT_KEY)
            req.userId = verified?.id;
        }
        else{
            verified = jwt.decode(token);
            req.userId = decodeData?.sub;
        }
       
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }

}

export default auth2;
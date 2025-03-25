import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14n * * * *", function(){
    https
    .get(process.env.API_URL, (res)=>{
        if(res.statusCode===200){
            console.log("API is working fine");
        }
        else{
            console.log("API is down",res.statusCode);
        }
    }).on("error", (e)=>{
        console.log("Error",e);
    });

})

export default job;

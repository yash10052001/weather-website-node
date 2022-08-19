const request=require('request');


const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=6b828d9864f8d273c031d8fd74556405&query='+latitude+','+longitude+'&units=f'
 
    request({ url:url,json:true },(error,response)=>{
       if (error) {
          callback("Bhag Bhosdike",undefined);
       }else if(response.body.error){
          callback("Unable to track down that loction nigga",undefined)
      } else {
           callback(undefined,"It is currently "+ response.body.current.temperature+"outside. There is" +response.body.current.feelslike+"  chance of rain. Have a good day");
        
      }
    

})
}
module.exports=forecast;
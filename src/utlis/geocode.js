const request=require('request');


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFzaDEwMDUyMDAxIiwiYSI6ImNsNm52aTdtejA0dHQzY3BvYmxqOWh1OXMifQ.8Dyx2WvsXFEUaE8eAJp30Q'

     request({url ,json:true},(error,{body})=>{ //putting body instead of resposne is destructruing 

        if(error){
            callback('Unable to connect to the server',undefined)
        }else if(body.features.length===0) {
                    callback("Track nahi ho raha hai bhosdike",undefined);
                }else{
                    callback(undefined,{
                        latitude:body.features[0].center[1],
                        longitude:body.features[0].center[0],
                        location:body.features[0].place_name
                    })
                }         
     })
    

}


module.exports=geocode;

//exporting the function of geocode from utlis to ap.js


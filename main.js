import { EdgeKV } from "./edgekv.js"; //include this file from the parent repository. https://github.com/akamai/edgeworkers-examples/blob/master/edgekv/lib/edgekv.js
import { logger } from "log";
import { createResponse } from 'create-response';
function createErrorResponse(message) {
  logger.log("entered createError Response");
  logger.log(message)
  return createResponse(
    400,
    { "Content-Type": ["application/json;charset=utf-8"] },
    JSON.stringify({ error: message })
  );
}

export async function onClientRequest (request) {
  // Outputs a message to the X-Akamai-EdgeWorker-onClientRequest-Log header.
  
  let deny_message={
    message:"Access denied by Requested too many IP address/deviceid",
    code:407

  };
  
  try {
  const edgeKv = new EdgeKV({ namespace: "freshvoot", group: "freshtest" });
  const user_id=request.getHeader('distinctId')[0] || request.getHeader('distinctId') || request.getVariable('distinctId');;
  logger.log(user_id);
  if(user_id){
     const resp = await edgeKv.getJson({
        item: user_id,
        default_value: "5d1aa73526576418cb51262a8759ee158989",
      });

      if(resp){
            request.respondWith(407, 
            { 'Content-Type': ['application/json'] }, 
            JSON.stringify(deny_message),"Access Denied");
      } 
  }
      
    } catch (error) {
      logger.log("Edgekv error for getting user details!");
      return createErrorResponse(error.toString());
    }
  
}
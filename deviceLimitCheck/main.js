import { EdgeKV } from "./edgekv.js"; //include this file from the parent repository. https://github.com/akamai/edgeworkers-examples/blob/master/edgekv/lib/edgekv.js
import { logger } from "log";
import { createResponse } from 'create-response';
import { Configs } from './config.js';
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
  
  if(request.getHeader('hash-identity')===undefined && request.getHeader('hash-Identity')===undefined){
     request.respondWith(400, 
            { 'Content-Type': ['application/json'] }, 
            JSON.stringify({message:Configs.VALID_ERROR_MESSAGE,code:9997}),"Invalid request hash-indentity missing from header");
  }
  
  let deny_message={message:Configs.ERROR_MESSAGE,code:9998};
  
  try {
  const edgeKv = new EdgeKV({ namespace: Configs.NAMESPACE, group: Configs.GROUP });
  const user_id=request.getHeader('hash-identity')[0] || request.getHeader('hash-Identity')[0];
  logger.log(user_id);
  if(user_id){
     const resp = await edgeKv.getJson({
        item: user_id
      });

      if(resp){
            request.respondWith(400, 
            { 'Content-Type': ['application/json'] }, 
            JSON.stringify(deny_message),"Access Denied");
      } 
  }
      
    } catch (error) {
      logger.log("Edgekv error for getting user details!");
      return createErrorResponse(error.toString());
    }
  
}
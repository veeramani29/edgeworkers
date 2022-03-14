import { createResponse } from 'create-response';
export function onClientResponse(request, response) {
  response.removeHeader('Server');
  response.addHeader('Server', 'nginx');
  response.setHeader('Server', 'nginx');
}
export function onClientResponse(request, response) {
    let headers = response.getHeaders();
        delete headers["Server"];
        headers["Server"]='nginx';

        return createResponse(
          response.status,
          headers,
          response.body
        );
}
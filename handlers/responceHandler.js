const sendResponse = async (res, statusCode, message, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.write(
      JSON.stringify({
        status: statusCode,
        message,
        data,
      })
    );
    res.end();
  };
  
  const sendError = async (res, statusCode, message, error) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(
      JSON.stringify({
        status: statusCode,
        message,
        error,
      })
    );
    res.end();
  };
  
  module.exports = {
    sendResponse,
    sendError,
  };
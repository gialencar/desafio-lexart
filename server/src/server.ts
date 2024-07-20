import app from './app';
import { SERVER_HOST, SERVER_PORT } from './config/config';

app.listen(SERVER_PORT, () => {
  console.log('---------------------------------');
  console.log(
    ' 🟢 \x1b[36m%s\x1b[0m',
    `Listening on ${SERVER_HOST}:${SERVER_PORT}`
  );
  console.log('---------------------------------');
});

import app from './app';
import { SERVER_PORT } from './config/config';

app.listen(SERVER_PORT, () => {
  console.log(`Listening: http://localhost:${SERVER_PORT}`);
});

import { KinesisStreamHandler, Handler, Context } from 'aws-lambda';
import { Kinesis } from "aws-sdk";
import 'source-map-support/register';

export const ingestStream: KinesisStreamHandler = async (event, _context) => {
  event.Records.forEach(record => {
    console.log(record.kinesis.data);
  });
}

export const feedStream: Handler = async (event, _context: Context) => {
  const stream = process.env.KINESIS_STREAM;
  const client = new Kinesis({region: 'us-east-1'});
  while(_context.getRemainingTimeInMillis() > 30) {
    
  }
}

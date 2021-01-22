import { KinesisStreamHandler, Handler, Context } from "aws-lambda";
import { Kinesis } from "aws-sdk";
import "source-map-support/register";

export const ingestStream: KinesisStreamHandler = async (event, _context) => {
  event.Records.forEach((record) => {
    console.log(record.kinesis.data);
  });
};

export const feedStream: Handler = async (_, _context: Context) => {
  console.log("start event");
  const stream = process.env.KINESIS_STREAM;
  const client = new Kinesis({ region: "us-east-1" });
  let loopIter = 0;
  while (_context.getRemainingTimeInMillis() > 30) {
    loopIter++;
    const partKey = `loop_${loopIter}`;
    const payload = JSON.stringify({
      event_x: Math.random() * 10,
      event_y: Math.random() * 20,
    });

    let resp = await client
      .putRecord({
        StreamName: stream,
        PartitionKey: partKey,
        Data: payload,
      })
      .promise();

    console.log(resp);
  }
};

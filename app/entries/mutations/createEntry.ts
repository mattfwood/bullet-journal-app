import { resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const CreateEntry = z
  .object({
    title: z.string(),
  })
  .nonstrict();

export default resolver.pipe(
  resolver.zod(CreateEntry),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const entry = await db.entry.create({
      data: {
        ...input,
        user: { connect: { id: ctx.session.userId } },
      },
    });

    return entry;
  }
);

import { resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const DeleteEntry = z
  .object({
    id: z.number(),
  })
  .nonstrict();

export default resolver.pipe(
  resolver.zod(DeleteEntry),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const entry = await db.entry.deleteMany({ where: { id } });

    return entry;
  }
);

import { resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const UpdateEntry = z
  .object({
    id: z.number(),
  })
  .nonstrict();

export default resolver.pipe(
  resolver.zod(UpdateEntry),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const entry = await db.entry.update({ where: { id }, data });

    return entry;
  }
);

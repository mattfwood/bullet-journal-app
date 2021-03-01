import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import * as z from 'zod';

const GetEntry = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
});

export default resolver.pipe(
  resolver.zod(GetEntry),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const entry = await db.entry.findFirst({ where: { id } });

    if (!entry) throw new NotFoundError();

    return entry;
  }
);

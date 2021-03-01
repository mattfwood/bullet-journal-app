import { paginate, resolver } from 'blitz';
import db, { Prisma } from 'db';

interface GetEntriesInput
  extends Pick<
    Prisma.EntryFindManyArgs,
    'where' | 'orderBy' | 'skip' | 'take'
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetEntriesInput, ctx) => {
    // users can only access their own tasks
    const updatedWhere = {
      ...where,
      user: {
        id: ctx.session?.userId,
      },
    };
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: entries, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.entry.count({ where: updatedWhere }),
      query: (paginateArgs) =>
        db.entry.findMany({ ...paginateArgs, where: updatedWhere, orderBy }),
    });

    return {
      entries,
      nextPage,
      hasMore,
      count,
    };
  }
);

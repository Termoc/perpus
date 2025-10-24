import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function fixSlugs() {
  const articles = await prisma.article.findMany();
  for (const a of articles) {
    if (!a.slug) {
      const slug = slugify(a.title, { lower: true, strict: true });
      await prisma.article.update({
        where: { id: a.id },
        data: { slug },
      });
      console.log(`✅ Slug diperbarui: ${a.title} → ${slug}`);
    }
  }
  await prisma.$disconnect();
}

fixSlugs();

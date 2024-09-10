import { getUserSession } from '@/utils/helpers/getUserSession';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '256KB', maxFileCount: 12 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const user = await getUserSession();

      if (!user) throw new UploadThingError('Unauthorized');
      if (user.role !== 'ADMIN') throw new UploadThingError('No access');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, role: user.role, name: user.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log(
        'Upload complete for user:',
        metadata.userId,
        metadata.role,
        metadata.name
      );

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.name, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

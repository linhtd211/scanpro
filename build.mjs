import {build} from 'esbuild';
import {mkdir,copyFile,readdir} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of await readdir('.')){
 if(/\.(html|js|css|svg|png|webp|ico|webmanifest|json)$/.test(file)&&!['package.json','package-lock.json','build.mjs','vercel.json'].includes(file)){
  try{await copyFile(file,'dist/'+file)}catch(e){if(e.code!=='EISDIR')throw e}
 }
}
await build({entryPoints:['scanic'],bundle:true,format:'esm',platform:'browser',target:['safari16','es2020'],outfile:'dist/scanic.bundle.js',logLevel:'info'});

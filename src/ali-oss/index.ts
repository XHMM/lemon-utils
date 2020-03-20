import { Readable } from "stream";
import * as Oss from "ali-oss";

export class AliOSS {
  static oss = new Oss({
    accessKeyId: process.env.AliOSS_KEY!,
    accessKeySecret: process.env.AliOSS_SECRET!,
    bucket: process.env.AliOSS_BUCKET!,
    region: process.env.AliOSS_REGION!,
    ...(process.env.AliOSS_UPLOAD_HOST && {
      endpoint: process.env.AliOSS_UPLOAD_HOST
    }),
    ...(process.env.AliOSS_TIMEOUT && { timeout: process.env.AliOSS_TIMEOUT })
  });
  static dir = process.env.AliOSS_DIR ?? "";

  static async putStream(
    name: string,
    stream: Readable
  ): Promise<{ ok: false } | { ok: true; url: string }> {
    try {
      const ret = (await AliOSS.oss.putStream(
        `${AliOSS.dir ? AliOSS.dir + "/" : ""}${name}`,
        stream
      )) as any;
      if (ret.res.status === 200) {
        return {
          ok: true,
          url: ret.url
        };
      } else {
        console.error(`素材上传至ali-oss失败，返回值是非200：`);
        console.error(ret);
        return {
          ok: false
        };
      }
    } catch (e) {
      console.error(`素材上传至ali-oss失败，catch：`);
      console.error(e);
      return {
        ok: false
      };
    }
  }

  static async delete(name: string): Promise<boolean> {
    const result = await AliOSS.oss.delete(AliOSS.dir + name);
    // 额，删除成功了但result.res.status是204，按理不应该是200么...
    // @ts-ignore
    if (result.res.status === 204) {
      return true;
    } else {
      console.error("删除ali-oss上的素材失败，返回值是非204：");
      console.error(result);
      return false;
    }
  }
}

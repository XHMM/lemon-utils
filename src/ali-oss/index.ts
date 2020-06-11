import { Readable } from "stream";
import * as OSS from 'ali-oss';

export class AliOSS {
  static oss;
  static dir = process.env.AliOSS_DIR ?? "";

  static init() {
    const oss = require('ali-oss');
    if(!oss)
      throw new Error("Did forget to run 'npm install ali-oss' ?")

    AliOSS.oss = new oss({
      accessKeyId: process.env.AliOSS_KEY!,
      accessKeySecret: process.env.AliOSS_SECRET!,
      bucket: process.env.AliOSS_BUCKET!,
      region: process.env.AliOSS_REGION!,
      endpoint: process.env.AliOSS_PRIVATE_HOST,
      ...(process.env.AliOSS_TIMEOUT && { timeout: process.env.AliOSS_TIMEOUT })
    });
  }

  static async putStream(
    name: string,
    stream: Readable
  ): Promise<{ ok: false } | { ok: true; url: string }> {
    AliOSS.check()

    try {
      const ret = (await AliOSS.oss.putStream(
        `${AliOSS.dir}${name}`,
        stream
      )) as any;
      if (ret.res.status === 200) {
        return {
          ok: true,
          url: AliOSS.replaceUrl(ret.url)
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
    AliOSS.check()

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

  static signature(
    baseName: string,
    expireSeconds: number,
    options?: Omit<OSS.SignatureUrlOptions, "expires">
  ): string {
    AliOSS.check()

    const url = AliOSS.oss.signatureUrl(AliOSS.dir + baseName, {
      ...options,
      expires: expireSeconds
    });
    return AliOSS.replaceUrl(url);
  }

  private static check() {
    if(!AliOSS.oss) {
      throw new Error("Did you forget to call AliOSS.init() ?")
    }
  }

  private static replaceUrl(url: string): string {
    const urlObj = new URL(url);
    urlObj.hostname = process.env.AliOSS_PUBLIC_HOST!;
    return urlObj.toString();
  }
}

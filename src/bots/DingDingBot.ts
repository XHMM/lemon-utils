import nodeFetch from 'node-fetch';

const url: string = process.env.DING_WEBHOOK!;

export class DingDingBot {
  private static async fetchBase(
    json: Record<string, any>
  ): Promise<{
    errcode: number;
    errmsg: string;
  }> {
    return await nodeFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    }).then(res => res.json());
  }

  @decorateError
  static async sendText(
    key: string,

    content: string
  ): Promise<{
    errcode: number;
    errmsg: string;
  }> {
    return await DingDingBot.fetchBase({
      msgtype: 'text',
      text: {
        content: `[${key}] ${content}`,
      },
    });
  }
  @decorateError
  static async sendMarkdown(
    key: string,
    title: string,
    md: string
  ): Promise<{
    errcode: number;
    errmsg: string;
  }> {
    return await DingDingBot.fetchBase({
      msgtype: 'markdown',
      markdown: {
        title: `[${key}] ${title}`,
        text: md,
      },
    });
  }
}

function decorateError(_target: any, _name: any, descriptor: any) {
  const origin = descriptor.value;
  descriptor.value = async function() {
    try {
      const { errcode, errmsg } = await origin.call(this, ...arguments);
      if (errcode !== 0) console.error(`机器人通知失败了： errcode is ${errcode}, errmsg is ${errmsg}`);
      return { errcode, errmsg };
    } catch (e) {
      console.error('机器人通知出错：');
      console.error(e);
      return  { errcode: -1, errmsg: 'catch捕获' };
    }
  };
}

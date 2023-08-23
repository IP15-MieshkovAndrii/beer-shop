import axios from 'axios';
import crypto from 'crypto';

export class LiqPay {
    constructor(public_key, private_key) {
        this.host = "https://www.liqpay.ua/api/";

        this.api = async function (path, params, callback, callbackerr) {
            if (!params.version) {
                throw new Error('version is null');
            }

            params.public_key = public_key;
            const data = Buffer.from(JSON.stringify(params)).toString('base64');
            const signature = this.str_to_sign(private_key + data + private_key);

            try {
                const response = await axios.post(this.host + path, { data, signature });
                if (response.status === 200) {
                    callback(response.data);
                } else {
                    callbackerr(response.statusText, response);
                }
            } catch (error) {
                callbackerr(error.message, null);
            }
        };

        this.cnb_form = function (params) {
            let language = "en";

            if (params.language) {
                language = params.language;
            }

            params = this.cnb_params(params);
            const data = Buffer.from(JSON.stringify(params)).toString('base64');
            const signature = this.str_to_sign(private_key + data + private_key);

            return `<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
      <input type="hidden" name="data" value="${data}" />
      <input type="hidden" name="signature" value="${signature}" />
      <input type="image" src="//static.liqpay.ua/buttons/p1${language}.radius.png" name="btn_text" />
    </form>`;
        };

        this.cnb_signature = function (params) {
            params = this.cnb_params(params);
            const data = Buffer.from(JSON.stringify(params)).toString('base64');
            return this.str_to_sign(private_key + data + private_key);
        };

        this.cnb_params = function (params) {
            params.public_key = public_key;

            if (!params.version || !params.amount || !params.currency || !params.description) {
                throw new Error('Some required parameters are missing');
            }

            return params;
        };

        this.str_to_sign = function (str) {
            const sha1 = crypto.createHash('sha1');
            sha1.update(str);
            return sha1.digest('base64');
        };

        this.cnb_object = function (params) {
            params = this.cnb_params(params);
            const data = Buffer.from(JSON.stringify(params)).toString('base64');
            const signature = this.str_to_sign(private_key + data + private_key);

            return { data, signature };
        };

        return this;
    }
}

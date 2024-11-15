const nodemailer = require("nodemailer");
let verificationMail = async (username, useremail, _id) => {
    try {
        console.log("Sending the email");
        console.log(`${username}${useremail}${_id}`);
        //Creating the tanspoter by using the nodemailer and send email
        let transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
        let info = await transporter.sendMail({
            from: '"Roadster.com" <roadster.com@zohomail.in>',
            to: useremail,
            subject: "Email Verifiction",
            // html: `<p>Hola ${username} !! Please click on the link to <a href="http://localhost:8000/verify?_id=${_id}">Verify</a> the email </p>`,
            html: `<head>
            <title></title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <style type="text/css">
                #outlook a {
                    padding: 0;
                }
        
                .ReadMsgBody {
                    width: 100%;
                }
        
                .ExternalClass {
                    width: 100%;
                }
        
                .ExternalClass * {
                    line-height: 100%;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    border-collapse: collapse;
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                    -ms-interpolation-mode: bicubic;
                }
        
                p {
                    display: block;
                    margin: 13px 0;
                }
            </style>
            <!--[if !mso]><!-->
            <style type="text/css">
                @media only screen and (max-width:480px) {
                    @-ms-viewport {
                        width: 320px;
                    }
        
                    @viewport {
                        width: 320px;
                    }
                }
            </style>
        
            <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
            <!-- Font Awesome -->
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <!-- Google Fonts -->
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <!-- MDB -->
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.css" rel="stylesheet" />
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
        
                    .mj-column-per-100,
                    * [aria-labelledby="mj-column-per-100"] {
                        width: 100% !important;
                    }
                }
            </style>
            <style id="__web-inspector-hide-shortcut-style__">
                .__web-inspector-hide-shortcut__,
                .__web-inspector-hide-shortcut__ *,
                .__web-inspector-hidebefore-shortcut__::before,
                .__web-inspector-hideafter-shortcut__::after {
                    visibility: hidden !important;
                }
            </style>
        </head>
        
        <body style="background: #F9F9F9;" data-new-gr-c-s-check-loaded="14.1093.0" data-gr-ext-installed=""
            class="d-flex flex-column aline-item-center justify-content-center p-5">
            <div style="background-color:#F9F9F9;">
                <style type="text/css">
                    html,
                    body,
                    * {
                        -webkit-text-size-adjust: none;
                        text-size-adjust: none;
                    }
        
                    a {
                        color: #1EB0F4;
                        text-decoration: none;
                    }
        
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
                <div style="margin:0px auto;max-width:640px;background:transparent;">
                    <table role="presentation" cellpadding="0" cellspacing="0"
                        style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
                        <tbody>
        
                        </tbody>
                    </table>
                </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                  <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div
                    style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden">
                    <div
                        style="margin:0px auto;max-width:640px;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;"><!--[if mso | IE]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
                  <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
                  <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
                        <table role="presentation" cellpadding="0" cellspacing="0"
                            style="font-size:0px;width:100%;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;"
                            align="center" border="0"
                            background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png">
                            <tbody>
                                <tr>
                                    <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;">
        
                                        <div
                                            style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">
                                            Welcome to Roadstar!</div>
        
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin:0px auto;max-width:640px;background:#ffffff;">
                        <table role="presentation" cellpadding="0" cellspacing="0"
                            style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
                            <tbody>
                                <tr>
                                    <td
                                        style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;">
                                        <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix"
                                            style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;"
                                                            align="left">
                                                            <div
                                                                style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                                                                <p><img src="https://cdn.discordapp.com/email_assets/127c95bbea39cd4bc1ad87d1500ae27d.png"
                                                                        alt="Party Wumpus" title="None" width="500"
                                                                        style="height: auto;"></p>
        
                                                                <h2
                                                                    style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">
                                                                    Hey ${username},</h2>
                                                                <p>Thank you for signing up with our website. We are excited to
                                                                    have you on board and can't wait for you to start using our
                                                                    services.
        
                                                                    If you have any questions or concerns, please contact us at
                                                                    roadster.com@zohomail.in.
                                                                </p>
                                                                <p>Before we get started, we'll need to verify your email .</p>
        
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="word-break:break-word;font-size:0px;padding:10px 25px;"
                                                            align="center">
                                                            <table role="presentation" cellpadding="0" cellspacing="0"
                                                                style="border-collapse:separate;" align="center" border="0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;"
                                                                            align="center" valign="middle" bgcolor="#7289DA">
        
        
        
        
                                                                            <a href="http://localhost:8000/verify?_id=${_id}"
                                                                                style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;"
                                                                                target="_blank">
                                                                                Verify Email
                                                                            </a>
        
        
        
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                    <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                  <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                </div>
                <div style="margin:0px auto;max-width:640px;background:transparent;">
                    <table role="presentation" cellpadding="0" cellspacing="0"
                        style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix"
                                        style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;">
                                                        <div style="font-size:1px;line-height:12px;">&nbsp;</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                  <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div
                    style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;">
                    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center"
                        border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;"><!--[if mso | IE]>
                <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix"
                                        style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
        
                                    </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                <!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                  <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:640px;background:transparent;">
                    <table role="presentation" cellpadding="0" cellspacing="0"
                        style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
                        <tbody>
                            <tr>
                                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                <![endif]-->
                                    <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix"
                                        style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                                        <div
                                                            style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
                                                            Sent by Roadstar
                                                        </div>
                                                    </td>
                                                </tr>
        
                                            </tbody>
                                        </table>
                                    </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div><!--[if mso | IE]>
                </td></tr></table>
                <![endif]-->
            </div>
        
            <!-- Code injected by live-server -->
            <script>
                // <![CDATA[  <-- For SVG support
                if ('WebSocket' in window) {
                    (function () {
                        function refreshCSS() {
                            var sheets = [].slice.call(document.getElementsByTagName("link"));
                            var head = document.getElementsByTagName("head")[0];
                            for (var i = 0; i < sheets.length; ++i) {
                                var elem = sheets[i];
                                var parent = elem.parentElement || head;
                                parent.removeChild(elem);
                                var rel = elem.rel;
                                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                                }
                                parent.appendChild(elem);
                            }
                        }
                        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
                        var address = protocol + window.location.host + window.location.pathname + '/ws';
                        var socket = new WebSocket(address);
                        socket.onmessage = function (msg) {
                            if (msg.data == 'reload') window.location.reload();
                            else if (msg.data == 'refreshcss') refreshCSS();
                        };
                        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
                            console.log('Live reload enabled.');
                            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
                        }
                    })();
                }
                else {
                    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
                }
          // ]]>
            </script>
            <!-- Code injected by live-server -->
            <script>
                // <![CDATA[  <-- For SVG support
                if ('WebSocket' in window) {
                    (function () {
                        function refreshCSS() {
                            var sheets = [].slice.call(document.getElementsByTagName("link"));
                            var head = document.getElementsByTagName("head")[0];
                            for (var i = 0; i < sheets.length; ++i) {
                                var elem = sheets[i];
                                var parent = elem.parentElement || head;
                                parent.removeChild(elem);
                                var rel = elem.rel;
                                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                                }
                                parent.appendChild(elem);
                            }
                        }
                        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
                        var address = protocol + window.location.host + window.location.pathname + '/ws';
                        var socket = new WebSocket(address);
                        socket.onmessage = function (msg) {
                            if (msg.data == 'reload') window.location.reload();
                            else if (msg.data == 'refreshcss') refreshCSS();
                        };
                        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
                            console.log('Live reload enabled.');
                            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
                        }
                    })();
                }
                else {
                    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
                }
          // ]]>
            </script>
            <grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration>
        
            <!-- Code injected by live-server -->
            <script>
                // <![CDATA[  <-- For SVG support
                if ('WebSocket' in window) {
                    (function () {
                        function refreshCSS() {
                            var sheets = [].slice.call(document.getElementsByTagName("link"));
                            var head = document.getElementsByTagName("head")[0];
                            for (var i = 0; i < sheets.length; ++i) {
                                var elem = sheets[i];
                                var parent = elem.parentElement || head;
                                parent.removeChild(elem);
                                var rel = elem.rel;
                                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                                }
                                parent.appendChild(elem);
                            }
                        }
                        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
                        var address = protocol + window.location.host + window.location.pathname + '/ws';
                        var socket = new WebSocket(address);
                        socket.onmessage = function (msg) {
                            if (msg.data == 'reload') window.location.reload();
                            else if (msg.data == 'refreshcss') refreshCSS();
                        };
                        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
                            console.log('Live reload enabled.');
                            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
                        }
                    })();
                }
                else {
                    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
                }
          // ]]>
            </script>
            <!-- MDB -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.1.0/mdb.min.js"></script>
        </body>`
        });
        console.log(info);
        return info;
    } catch (err) {
        console.log(err);
        res.send(err);
    }


}

module.exports = verificationMail;
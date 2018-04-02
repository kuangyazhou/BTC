import i18n from '@/i18n/i18n';

const msg = {
  1001: i18n.t('message.1001'),
  1002: i18n.t('message.1002'),
  1003: i18n.t('message.1003'),
  2001: i18n.t('message.2001'),
  2002: i18n.t('message.2002'),
  2003: i18n.t('message.2003'),
  2004: i18n.t('message.2004'),
  2005: i18n.t('message.2005'),
  2006: i18n.t('message.2006'),
  2007: i18n.t('message.2007'),
  2008: i18n.t('message.2008'),
  2009: i18n.t('message.2009'),
  2010: i18n.t('message.2010'),
  2011: i18n.t('message.2011'),
  2012: i18n.t('message.2012'),
  2013: i18n.t('message.2013'),
  2014: i18n.t('message.2014'),
  2015: i18n.t('message.2015'),
  2016: i18n.t('message.2016'),
  2017: i18n.t('message.2017'),
  2018: i18n.t('message.2018'),
  2019: i18n.t('message.2019'),
  2020: i18n.t('message.2020'),
  2021: i18n.t('message.2021'),
  2022: i18n.t('message.2022'),
  2023: i18n.t('message.2023'),
  2024: i18n.t('message.2024'),
  2025: i18n.t('message.2025'),
  2026: i18n.t('message.2026'),
  2027: i18n.t('message.2027'),
  2028: i18n.t('message.2028'),
  2029: i18n.t('message.2029'),
  2031: i18n.t('message.2031'),
  2032: i18n.t('message.2032'),
  2033: i18n.t('message.2033'),
  2034: i18n.t('message.2034'),
  2035: i18n.t('message.2035'),
  2036: i18n.t('message.2036'),
  2037: i18n.t('message.2037'),
  2038: i18n.t('message.2038'),
  2039: i18n.t('message.2039'),
  2040: i18n.t('message.2040'),
  2041: i18n.t('message.2041'),
  2042: i18n.t('message.2042'),
  2043: i18n.t('message.2043'),
  2044: i18n.t('message.2044'),
  2045: i18n.t('message.2045'),
  2046: i18n.t('message.2046'),
  2047: i18n.t('message.2047'),
  3001: i18n.t('message.3001'),
  3002: i18n.t('message.3002'),
  3003: i18n.t('message.3003'),
  3004: i18n.t('message.3004'),
  3005: i18n.t('message.3005'),
  3006: i18n.t('message.3006'),
  3007: i18n.t('message.3007'),
  3008: i18n.t('message.3008'),
  3009: i18n.t('message.3009'),
  3010: i18n.t('message.3010'),
}

import {
  Message
} from 'element-ui';

export function requestPipe(res) {
  // console.log(i18n);
  if (!res.data.status) {
    // console.log(msg[res.data.error_id]);
    Message({
      center: true,
      message: msg[res.data.error_id],
      duration: 1500,
      type: 'error',
    });
  }
}
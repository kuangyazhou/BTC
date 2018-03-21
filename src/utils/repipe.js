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
    })
  }
}

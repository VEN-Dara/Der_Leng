import React from 'react';
import UilPhone from '@iconscout/react-unicons/icons/uil-phone';
import UilGlobe from '@iconscout/react-unicons/icons/uil-globe';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import UilTelegramAlt from '@iconscout/react-unicons/icons/uil-telegram-alt';
import UilTelegram from '@iconscout/react-unicons/icons/uil-telegram';
import FontAwesome from 'react-fontawesome';
import { UserBioBox } from './Style';
import { Button } from '../../../../resource/components/buttons/buttons';
import { Link } from 'react-router-dom';

function UserBio({ user }) {
  const { email, phone, telegram } = user;
  return (
    <UserBioBox>
      <div className="p-[25px] bg-white dark:bg-white10 rounded-10 mb-[25px]">
        <address className="mb-[22px] pb-[22px] border-normal border-b-1 dark:border-white10">
          <h5 className="text-[12px] text-light dark:text-white60 uppercase mb-[16px]">Contact Info</h5>
          <ul className="mb-0 user-info__contact">
            <li className="flex items-center mb-[14px] last:mb-0 gap-[12px] text-theme-gray dark:text-white60 text-[14px]">
              <UilEnvelope className="w-[16px] h-[16px] text-light dark:text-white60" />{' '}
              <span>{email}</span>
            </li>
            <li className="flex items-center mb-[14px] last:mb-0 gap-[12px] text-theme-gray dark:text-white60 text-[14px]">
              <UilPhone className="w-[16px] h-[16px] text-light dark:text-white60" /> <span>{phone}</span>
            </li>
            {
              telegram &&
              (
                <>
                  <li className="flex items-center mb-[14px] last:mb-0 gap-[12px] text-theme-gray dark:text-white60 text-[14px]">
                    <UilTelegramAlt className="w-[16px] h-[16px] text-light dark:text-white60" />{' '}
                    <span>{telegram.first_name} {telegram.last_name}</span>
                  </li>
                  <Link to={`${"https://t.me/"}${telegram.username}`} target='_blank' referrerPolicy='no-referrer-when-downgrade'>
                    <li className="flex items-center mb-[14px] last:mb-0 gap-[12px] text-success text-[14px] hover:underline">
                      <UilTelegram className="w-[16px] h-[16px] text-success " /> <span>{"t.me/"}{telegram.username}</span>
                    </li>
                  </Link>
                </>
              )
            }
          </ul>
        </address>
        <article className="mb-[22px] pb-[22px] border-normal border-b-1 dark:border-white10">
          <h5 className="text-[12px] text-green-400 dark:text-white60 uppercase mb-[16px]">ជូនដំណឹង</h5>
          <p className="mb-0 text-[15px] leading-[1.667] text-theme-gray dark:text-white60 ">
            នៅពេលដែលអ្នកបានធ្វើការកក់ហើយ សូមចំណាំថាអ្នកផ្តល់សេវាមានពេល 24 ម៉ោងដើម្បីបញ្ជាក់ការកក់របស់អ្នក។ ប្រសិនបើ​មិនមាន​ការបញ្ជាក់​ក្នុង​រយៈពេល​នេះទេ សូម​ប្រាកដ​ថា​អ្នក​នឹង​ទទួល​បាន​ការ​បង្វិលសង​ពេញលេញ។ កុំភ្លេចពិនិត្យមើលព័ត៌មានលម្អិតអំពីការចេញវិក្កយបត្ររបស់អ្នកបន្ទាប់ពីការកក់ទុក ដើម្បីធានាបាននូវភាពត្រឹមត្រូវ។ សូមជូនពរដំណើរកម្សាន្តប្រកបដោយភាពរីករាយ!
          </p>
        </article>
      </div>
    </UserBioBox>
  );
}

export default UserBio;

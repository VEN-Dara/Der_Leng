import React from 'react';
import UilPhone from '@iconscout/react-unicons/icons/uil-phone';
import UilGlobe from '@iconscout/react-unicons/icons/uil-globe';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import FontAwesome from 'react-fontawesome';
import { UserBioBox } from './Style';
import { Button } from '../../../../resource/components/buttons/buttons';

function UserBio({user}) {
  const {email, phone} = user;
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
            {/* <li className="flex items-center mb-[14px] last:mb-0 gap-[12px] text-theme-gray dark:text-white60 text-[14px]">
              <UilGlobe className="w-[16px] h-[16px] text-light dark:text-white60" /> <span>www.example.com</span>
            </li> */}
          </ul>
        </address>
        <article className="mb-[22px] pb-[22px] border-normal border-b-1 dark:border-white10">
          <h5 className="text-[12px] text-green-400 dark:text-white60 uppercase mb-[16px]">Notify</h5>
          <p className="mb-0 text-[15px] leading-[1.667] text-theme-gray dark:text-white60 ">
          Once you've made a booking, please note that the service provider has 24 hours to confirm your reservation.
           If there's no confirmation within this time frame, rest assured that you'll receive a full refund. Remember to review your billing details after booking to ensure accuracy.
           Wishing you a pleasant and enjoyable trip!
          </p>
        </article>

        {/* ===========================================> Skill Profile <=========================================== */}

        {/* <div className="mb-[22px] pb-[22px] border-normal  border-b-1 dark:border-white10">
          <h5 className="text-[12px] text-light dark:text-white60 uppercase mb-[16px]">Skills</h5>
          <div className="flex items-center flex-wrap gap-[6px]">
            <Button className="text-[11px] leading-[25px] font-medium flex items-center justify-center text-theme-gray dark:text-white60 btn-outlined h-[25px] dark:bg-white10 border-deep dark:border-white10 px-[8.75px] uppercase rounded-[5px]">
              UI/UX
            </Button>
            <Button className="text-[11px] leading-[25px] font-medium flex items-center justify-center text-theme-gray dark:text-white60 btn-outlined h-[25px] dark:bg-white10 border-deep dark:border-white10 px-[8.75px] uppercase rounded-[5px]">
              Branding
            </Button>
            <Button className="text-[11px] leading-[25px] font-medium flex items-center justify-center text-theme-gray dark:text-white60 btn-outlined h-[25px] dark:bg-white10 border-deep dark:border-white10 px-[8.75px] uppercase rounded-[5px]">
              product design
            </Button>
            <Button className="text-[11px] leading-[25px] font-medium flex items-center justify-center text-theme-gray dark:text-white60 btn-outlined h-[25px] dark:bg-white10 border-deep dark:border-white10 px-[8.75px] uppercase rounded-[5px]">
              web design
            </Button>
            <Button className="text-[11px] leading-[25px] font-medium flex items-center justify-center text-theme-gray dark:text-white60 btn-outlined h-[25px] dark:bg-white10 border-deep dark:border-white10 px-[8.75px] uppercase rounded-[5px]">
              Application
            </Button>
          </div>
        </div>
        <div>
          <h5 className="text-[12px] text-light dark:text-white60 uppercase mb-[16px]">Social Profiles</h5>
          <div className="flex flex-wrap items-center mt-[16px] gap-[10px]">
            {socialMediaLinks.map((link) => (
              <a
                key={link.id}
                className={`w-[44px] h-[44px] rounded-full inline-flex items-center justify-center bg-white dark:bg-white10 shadow-[0_5px_15px_rgba(116,116,116,0.13)] btn-icon text-${link.icon}`}
                href={`https://${link.name.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesome className="text-[16px]" name={link.icon} />
              </a>
            ))}
          </div>
        </div> */}
      </div>
    </UserBioBox>
  );
}

export default UserBio;

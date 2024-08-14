import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPIN, verifyPIN } from '@/api/plex';
import { stringify } from 'qs';
import { FaSignInAlt } from "react-icons/fa";


const clientID = localStorage.getItem('X-Plex-Client-Identifier');

export const PlexLoginButton = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [popUp, setPopUp] = useState<Window | null>(null);

  const GetPINQuery = useQuery({
    queryKey: ['LoginWithPlex', 'PIN'],
    queryFn: () => getPIN(),
    staleTime: Infinity,
    enabled: false
  });

  const PINVerificationQuery = useQuery ({
    queryKey: ['LoginWithPlex', 'Verification'],
    queryFn: () => verifyPIN(GetPINQuery.data?.code, GetPINQuery.data?.id),
    refetchInterval: 1000,
    enabled: !!GetPINQuery.data?.code && !isVerified
  })

  useEffect(() => {
    if (PINVerificationQuery.data?.authToken) {
      localStorage.setItem('authToken', PINVerificationQuery.data?.authToken);
      setIsVerified(true);
      closePopup();
    }
  }, [PINVerificationQuery.data?.authToken]);

  useEffect(() => {
    if (GetPINQuery.data?.code) {
      showPopup();
    }
  }, [GetPINQuery.data?.code]);
  
  const AuthUrl = 'https://app.plex.tv/auth/#?' + stringify({
    clientID: clientID,
    code: GetPINQuery.data?.code,
    context: {
      device: {
        product: 'PlexPlaylistManager',
      },
    },
  });

  const showPopup = () => {
    const popUp = window.open(AuthUrl, 'Login With Plex', 'scrollbar=yes, width=600, height=800');
    if (popUp) {
      popUp.focus();
    }
    setPopUp(popUp);
  };

  const closePopup = () => {
    if (popUp) {
      popUp.close();
    }
  }

  return (
    <div>
      <button onClick={() => {GetPINQuery.refetch()}} type="button" className="text-white bg-[#E5A00D] hover:bg-[#E5A00D]/90 focus:ring-4 focus:outline-none focus:ring-[#E5A00D]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#E5A00D]/30 me-2 mb-2">
        <FaSignInAlt />&nbsp;
        Sign in with Plex
      </button>
    </div>
  )
}
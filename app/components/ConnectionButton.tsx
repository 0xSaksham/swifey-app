import React, { useState } from 'react';
import Button from './Button';
import StakingModal from './StakingModal';

interface ConnectionButtonProps {
  targetUserId: string;
  targetWallet: string;
  onConnectionComplete?: () => void;
}

export default function ConnectionButton({
  targetUserId,
  targetWallet,
  onConnectionComplete
}: ConnectionButtonProps) {
  const [showStakingModal, setShowStakingModal] = useState(false);

  const handleStakeComplete = () => {
    onConnectionComplete?.();
    setShowStakingModal(false);
  };

  return (
    <>
      <Button
        title="Connect"
        onPress={() => setShowStakingModal(true)}
      />

      <StakingModal
        visible={showStakingModal}
        onClose={() => setShowStakingModal(false)}
        targetUserId={targetUserId}
        targetWallet={targetWallet}
        onStakeComplete={handleStakeComplete}
      />
    </>
  );
}

import BasePage from '@/components/Dashboard/BasePage';
import GenericModalButton from '@/components/ModalButton/ModalButton';

import UIAssetUpload from '@/components/Dashboard/UIAssets/UIAssetUpload';
import UIAssetList from '@/components/Dashboard/UIAssets/UIAssetList';

export default function UIAssetsPage() {
  return (
    <BasePage>
      <div className="m-8 flex justify-end">
        <GenericModalButton
          buttonLabel="Adicionar Imagem"
          title="Upload de Imagem"
          size="md"
        >
          <UIAssetUpload />
        </GenericModalButton>
      </div>

      <UIAssetList />
    </BasePage>
  );
}

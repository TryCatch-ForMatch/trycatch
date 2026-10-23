import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

import UIAssetUpload from '@/components/Dashboard/UIAssets/UIAssetUpload';
import UIAssetList from '@/components/Dashboard/UIAssets/UIAssetList';

export default function UIAssetsPage() {
  return (
    <>
      <div className="m-8 flex justify-end">
        <Modal
          title="Upload de Imagem"
          trigger={
            <Button className="h-10">
              Adicionar Imagem
              <Plus aria-hidden />
            </Button>
          }
        >
          <UIAssetUpload />
        </Modal>
      </div>

      <UIAssetList />
    </>
  );
}

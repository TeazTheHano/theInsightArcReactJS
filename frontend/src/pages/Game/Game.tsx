import { useTranslation } from "react-i18next";
import ContainerWithLoading from "../../components/ContainerWithLoading/ContainerWithLoading";
import { useModal } from "../../hooks/useModal";

export default function Game() {
  const { t: t_toast } = useTranslation('toast')
  // no filepath - usage example
  const { openModal } = useModal();
  
  return (
    <ContainerWithLoading loadingState={false} errMessage={t_toast('info.noData')}>
      <></>
    </ContainerWithLoading>
  )
}

'use client';

import Link from 'next/link';

import { MyButton } from '~/components/elements/buttons/button';
import { MyAlertMessage } from '~/components/surface/dialogs/alert-message';
import { MyPageContainer } from '~/features/app/components/page-container';
import { MyStudyAlert } from '~/features/app/components/study-alert';
import { MyAdminArticleContainer } from '~/features/article/components/admin-article-container';

import { MyCreateArticleForm } from './components/create-artical-form';
import { useHooks } from './hooks';

export default function ArticleCreatePage() {
  const { error, studyError, isCreating, handleSubmit } = useHooks();
  return (
    <MyPageContainer>
      <h1>新規メモ作成</h1>
      <MyAdminArticleContainer>
        {error && <MyAlertMessage color="error">{error.message}</MyAlertMessage>}
        <MyCreateArticleForm isSubmitting={isCreating} onSubmit={handleSubmit} />
        <div>
          <MyButton asChild>
            <Link href="/">一覧に戻る</Link>
          </MyButton>
        </div>
      </MyAdminArticleContainer>
      {studyError && (
        <MyStudyAlert
          message={studyError.message}
          description="API (http://localhost:8000/articles/create) の開発が完了すると作成ボタンをクリックした際に「新規メモをデータベースに登録」し、「一覧画面に戻る」ようになります。"
        />
      )}
    </MyPageContainer>
  );
}

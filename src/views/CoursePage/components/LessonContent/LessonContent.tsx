'use client';

import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Textarea } from '@/shared/ui/Textarea';
import type { LessonContentProps } from './LessonContent.types';
import s from './LessonContent.module.css';

const COPIED_RESET_MS = 2000;

export const LessonContent: FC<LessonContentProps> = ({
    lesson,
    lessonIndex,
    totalLessons,
    isCompleted,
    onComplete,
}) => {
    const t = useTranslations('course');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answer, setAnswer] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const handleAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(e.target.value);
        if (hasError) { setHasError(false); }
    };

    const handleSubmit = () => {
        if (!answer.trim()) {
            setHasError(true);
            return;
        }
        setHasError(false);
        setIsSubmitted(true);
    };

    const handleShare = async () => {
        const url = `${window.location.origin}${window.location.pathname}?lesson=${lessonIndex + 1}`;
        try {
            await navigator.clipboard.writeText(url);
            setIsLinkCopied(true);
            window.setTimeout(() => setIsLinkCopied(false), COPIED_RESET_MS);
        } catch {}
    };

    const theoryParagraphs = lesson.theory.split('\n\n');
    const showDoneButton = isCompleted || isSubmitted;

    return (
        <article className={s.root}>
            <div className={s.meta}>
                <span className={s.lessonNum}>
                    {t('lessonOf', { current: lessonIndex + 1, total: totalLessons })}
                </span>

                {isCompleted && <Badge variant="accent">{t('completed')}</Badge>}

                <button type="button" className={s.shareBtn} onClick={handleShare}>
                    {isLinkCopied ? t('linkCopied') : t('shareLesson')}
                </button>
            </div>

            <h2 className={s.title}>{lesson.title}</h2>

            <section className={s.section}>
                <p className={s.sectionTag}>{t('theory')}</p>

                <div className={s.theory}>
                    {theoryParagraphs.map((paragraph, i) => (
                        <p key={i} className={s.theoryParagraph}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            <section className={s.section}>
                <p className={s.sectionTag}>{t('example')}</p>

                <div className={s.chat}>
                    <div className={s.chatMessageUser}>
                        <span className={s.chatAvatar}>{t('chatYou')}</span>

                        <div className={s.chatBubbleUser}>
                            {lesson.chatUser.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < lesson.chatUser.split('\n').length - 1 && <br />}</span>
                            ))}
                        </div>
                    </div>

                    <div className={s.chatMessage}>
                        <span className={s.chatAvatar}>{t('chatAi')}</span>

                        <div className={s.chatBubbleAi}>
                            {lesson.chatAI.split('\n').map((line, i) => (
                                <span key={i}>{line}{i < lesson.chatAI.split('\n').length - 1 && <br />}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className={s.section}>
                <p className={s.sectionTag}>{t('practice')}</p>

                <div className={s.taskCard}>
                    <h3 className={s.taskTitle}>{lesson.taskTitle}</h3>

                    <p className={s.taskText}>{lesson.taskText}</p>

                    {isCompleted ? (
                        <>
                            <Textarea disabled value={t('taskDone')} />

                            <div className={s.encouragement}>
                                {lesson.encouragement}
                            </div>
                        </>
                    ) : (
                        <>
                            <Textarea
                                placeholder={lesson.taskPlaceholder}
                                value={answer}
                                onChange={handleAnswerChange}
                                disabled={isSubmitted}
                                error={hasError ? t('answerRequired') : undefined}
                            />

                            {!isSubmitted && (
                                <div className={s.submitWrap}>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={handleSubmit}
                                    >
                                        {t('markReady')}
                                    </Button>
                                </div>
                            )}

                            {isSubmitted && (
                                <div className={s.encouragement}>
                                    {lesson.encouragement}
                                </div>
                            )}
                        </>
                    )}

                    {showDoneButton && !isCompleted && (
                        <div className={s.doneWrap}>
                            <Button
                                type="button"
                                variant="primary"
                                onClick={onComplete}
                            >
                                {lessonIndex + 1 < totalLessons ? t('lessonDone') : t('courseFinish')}
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </article>
    );
};

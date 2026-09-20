'use client';

import { useApp } from '../../context/AppContext';
import HomePage from '../page';

export default function ActivitiesPage() {
  const { t } = useApp();

  return (
    <HomePage />
  );
}

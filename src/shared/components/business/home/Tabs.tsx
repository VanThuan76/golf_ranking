import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HomeTable from './Table';

const TabsListGender = () => {
  return (
    <Tabs defaultValue='male' className='w-full'>
      <TabsList>
        <TabsTrigger value='male'>Nam</TabsTrigger>
        <TabsTrigger value='female'>Nữ</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
const HomeTabs = () => {
  return (
    <section id='HomeTabs' className='w-full'>
      <Tabs defaultValue='mix' className='w-full'>
        <TabsList>
          <TabsTrigger value='mix'>Bảng tổng hợp</TabsTrigger>
          <TabsTrigger value='under-18'>Bảng U18</TabsTrigger>
          <TabsTrigger value='under-15'>Bảng U15</TabsTrigger>
          <TabsTrigger value='under-12'>Bảng U12</TabsTrigger>
          <TabsTrigger value='under-9'>Bảng U9</TabsTrigger>
        </TabsList>
        <TabsContent value='mix'>
          <HomeTable />
        </TabsContent>
        <TabsContent value='under-18'>
          <TabsListGender />
        </TabsContent>
        <TabsContent value='under-15'>
          <TabsListGender />
        </TabsContent>
        <TabsContent value='under-12'>
          <TabsListGender />
        </TabsContent>
        <TabsContent value='under-9'>
          <TabsListGender />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default HomeTabs;

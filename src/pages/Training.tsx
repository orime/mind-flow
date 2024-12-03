import React, { useState } from 'react';
import { Input, Steps, Card, Button, Typography, message, Modal, Spin } from 'antd';
import { thinkingProtocol } from '../data/protocol';
import { CopyOutlined, RobotOutlined } from '@ant-design/icons';
import { AI_SUMMARY_PROMPT, formatSummaryContent } from '../config/prompts';
import { TypeWriter } from '../components/TypeWriter';
import ReactMarkdown from 'react-markdown';
import '../styles/markdown.css';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const Training: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [situation, setSituation] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep <= thinkingProtocol.sections.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentStep]: value
    });
  };

  const handleCopy = () => {
    const summaryText = `思维训练总结：\n\n初始情况：\n${situation}\n\n` +
      thinkingProtocol.sections.map((section, index) => (
        `${section.title}：\n${answers[index + 1] || '未填写'}\n`
      )).join('\n');

    navigator.clipboard.writeText(summaryText)
      .then(() => {
        message.success('已复制到剪贴板');
      })
      .catch(() => {
        message.error('复制失败，请手动复制');
      });
  };

  const handleAiSummary = async () => {
    setAiModalVisible(true);
    setLoading(true);
    setAiSummary('');

    try {
      const content = formatSummaryContent(situation, answers, thinkingProtocol.sections);
      const prompt = AI_SUMMARY_PROMPT.replace('{content}', content);

      const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-dIkqbcS0gsSwLUDJ8HKL4FePyrhO6fZ3JNlT6P8OY6MnLMg6'
        },
        body: JSON.stringify({
          "model": "moonshot-v1-8k",
          "messages": [
            {
              "role": "system",
              "content": prompt
            }
          ],
          "stream": true
        })
      });

      if (!response.ok) {
        throw new Error('AI 分析请求失败');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') continue;

            try {
              const jsonData = JSON.parse(jsonStr);
              const content = jsonData.choices[0]?.delta?.content || '';
              setAiSummary(prev => prev + content);
            } catch (e) {
              console.error('解析响应数据失败:', e);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('network')) {
        message.error('网络连接失败，请检查网络后重试');
      } else {
        message.error('AI 分析失败，请稍后重试');
      }
      console.error('AI Summary Error:', error);
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (currentStep === 0) {
      return (
        <div>
          <Title level={4}>请描述你当前面对的情况</Title>
          <TextArea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="例如：我需要做一个重要的职业选择..."
            rows={4}
          />
        </div>
      );
    }

    const section = thinkingProtocol.sections[currentStep - 1];
    return (
      <div>
        <Title level={4}>{section.title}</Title>
        <Card>
          {section.steps.map((step, index) => (
            <Paragraph key={index}>{step}</Paragraph>
          ))}
        </Card>
        <TextArea
          value={answers[currentStep]}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="请根据上述步骤进行思考并记录..."
          rows={6}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={4}>思考总结</Title>
          <div>
            <Button 
              type="primary" 
              icon={<RobotOutlined />}
              onClick={handleAiSummary}
              style={{ marginRight: 8 }}
            >
              AI 分析
            </Button>
            <Button 
              type="primary" 
              icon={<CopyOutlined />}
              onClick={handleCopy}
            >
              复制总结内容
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={4}>初始情况</Title>
        </div>
        <Card title="初始情况">
          <Paragraph>{situation}</Paragraph>
        </Card>
        {thinkingProtocol.sections.map((section, index) => (
          <Card title={section.title} style={{ marginTop: 16 }} key={index}>
            <Paragraph>{answers[index + 1] || '未填写'}</Paragraph>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>思维训练</Title>
      <Steps
        current={currentStep}
        items={[
          { title: '描述情况' },
          ...thinkingProtocol.sections.map(section => ({
            title: section.title
          })),
          { title: '总结' }
        ]}
        style={{ marginBottom: 24 }}
      />
      
      {currentStep === thinkingProtocol.sections.length + 1 
        ? renderSummary()
        : renderContent()
      }

      <div style={{ marginTop: 24 }}>
        <Button 
          onClick={handlePrevious}
          disabled={currentStep === 0}
          style={{ marginRight: 8 }}
        >
          上一步
        </Button>
        <Button 
          type="primary"
          onClick={handleNext}
          disabled={currentStep > thinkingProtocol.sections.length}
        >
          {currentStep === thinkingProtocol.sections.length ? '完成' : '下一步'}
        </Button>
      </div>
      <Modal
        title="AI 分析报告"
        open={aiModalVisible}
        onCancel={() => setAiModalVisible(false)}
        footer={[
          <Button 
            key="copy" 
            type="primary" 
            icon={<CopyOutlined />} 
            onClick={() => {
              navigator.clipboard.writeText(aiSummary);
              message.success('已复制 AI 分析报告');
            }}
            disabled={!aiSummary}
          >
            复制报告
          </Button>,
          <Button key="close" onClick={() => setAiModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Spin tip="AI 正在分析中..." />
          </div>
        ) : (
          <TypeWriter text={aiSummary || '等待 AI 分析...'} speed={20} />
        )}
      </Modal>
    </div>
  );
};

export default Training;

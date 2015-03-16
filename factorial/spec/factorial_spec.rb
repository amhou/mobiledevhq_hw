#!/usr/bin/env ruby

require_relative '../factorial'

describe 'factorial' do
  it "should handle 0 case" do
    expect(factorial(0)).to eq 1
  end

  it "should handle regular integers" do
    expect(factorial(5)).to eq 120
  end

  it "should handle negative integers" do
    expect {factorial(-5)}.to raise_error
  end
end
